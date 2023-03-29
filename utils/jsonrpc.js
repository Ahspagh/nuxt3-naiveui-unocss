function jsonrpc(url, onopen, onclose, onnotification) {
	const ws = new WebSocket(url);
	const pending = {};

	ws.onopen = onopen;
	ws.onclose = onclose;
	ws.onmessage = function (event) {
		const message = JSON.parse(event.data);
		if (message.id in pending) {
			const resolve = pending[message.id];
			delete pending[message.id];
			resolve(message.result);
		} else if (onnotification) {
			onnotification(message);
		}
	};

	function call(method, params) {
		const id = Math.random().toString(36).substr(2, 9);
		const request = { jsonrpc: "2.0", method, params, id };
		const message = JSON.stringify(request);

		return new Promise((resolve, reject) => {
			const timeout = setTimeout(resolve, JSONRPC_TIMEOUT_MS);
			pending[id] = function (result) {
				clearTimeout(timeout);
				resolve(result);
			};

			ws.send(message);
			setTimeout(() => {
				if (id in pending) {
					delete pending[id];
					reject(new Error(`JSON-RPC call '${method}' timed out after ${JSONRPC_TIMEOUT_MS}ms`));
				}
			}, JSONRPC_TIMEOUT_MS);
		});
	}

	function close() {
		ws.close();
	}

	return { call, close };
}

class JSONRPC {
	constructor(url, onopen, onclose, onnotification) {
		this.rpcid = 0;
		this.pending = {};
		this.ws = new WebSocket(url);
		this.ws.onclose = onclose;
		this.ws.onmessage = ev => {
			const frame = JSON.parse(ev.data);
			console.log("rcvd", frame, "pending:", this.pending);
			if (frame.id !== undefined) {
				if (this.pending[frame.id] !== undefined) this.pending[frame.id](frame); // Resolve
				delete this.pending[frame.id];
			} else {
				if (onnotification) onnotification(frame);
			}
		};
		if (onopen) onopen();
	}

	close() {
		this.ws.close();
	}

	call(method, params) {
		const id = this.rpcid++,
			request = { id, method, params };
		this.ws.send(JSON.stringify(request));
		console.log("sent", request);
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (this.pending[id] === undefined) return;
				console.log("Timing out frame", JSON.stringify(request));
				delete this.pending[id];
				reject();
			}, JSONRPC_TIMEOUT_MS);
			this.pending[id] = x => resolve(x);
		});
	}
}

const rpc = new JSONRPC(url, onopen, onclose, onnotification);
rpc
	.call(method, params)
	.then(result => console.log(result))
	.catch(error => console.error(error));
rpc.close();
