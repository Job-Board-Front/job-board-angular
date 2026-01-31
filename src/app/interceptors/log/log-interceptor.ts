import { HttpInterceptorFn } from '@angular/common/http';

export const logInterceptor: HttpInterceptorFn = (req, next) => {
  if (process.env['NG_ENV'] === 'dev') {
    // Log the request details
    console.log('HTTP Request:', {
      url: req.url,
      method: req.method,
      headers: req.headers,
      body: req.body,
    });
  }

  return next(req);
};
