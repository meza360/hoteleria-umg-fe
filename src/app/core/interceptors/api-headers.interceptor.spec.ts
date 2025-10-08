import { ApiHeadersInterceptor } from './api-headers.interceptor';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

describe('ApiHeadersInterceptor', () => {
  let interceptor: ApiHeadersInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    interceptor = new ApiHeadersInterceptor();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add custom headers to the request', (done) => {
    const mockRequest = new HttpRequest('GET', '/test');
    const mockHandler: HttpHandler = {
      handle: (req) => {
        expect(req.headers.has('X-API-KEY')).toBeTrue();
        expect(req.headers.get('X-API-KEY')).toBe('your-api-key');
        expect(req.headers.has('Group-Id')).toBeTrue();
        expect(req.headers.get('Group-Id')).toBe('umg');
        done();
        return new Observable();
      },
    };

    interceptor.intercept(mockRequest, mockHandler);
  });
});
