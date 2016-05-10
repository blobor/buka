import 'whatwg-fetch';

const fetch = self.fetch.bind(self);
const Headers = self.Headers;
const Request = self.Request;
const Response = self.Response;

export {
  fetch as default,
  Headers,
  Request,
  Response
};