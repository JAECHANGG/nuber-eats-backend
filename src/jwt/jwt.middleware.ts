import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { UserService } from 'src/users/users.service';
import { JwtService } from './jwt.service';

// middleware는 express에서 사용할 때 처럼 next() 함수를 호출해야 한다.

// 상속받은 Class가 interface처럼 행동해야 할 때 extends를 사용하지 않고 implements를 사용한다.
@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      try {
        const decoded = this.jwtService.verify(token.toString());
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const user = await this.userService.findById(decoded['id']);
          req['user'] = user;
        }
      } catch (e) {}
    }
    next();
  }
}

// export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
//   console.log(req.headers);
//   next();
// }
