import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// guard는 함수인데 request를 다음 단계로 진행할지 말지를 정한다.
// CanActivate는 함수인데 context를 보고 true를 return하면 Request를 진행시키고 false면 멈춘다.
// 이 함수는 execution context라는 것을 사용하는데 이게 request의 context에 접근할 수 있게 해준다.
// graphql의 context가 아닌 현재의 pipeline의 context
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context).getContext(); // HTTP인 context를 graphql로 바꿔준다.
    const user = gqlContext['user'];

    if (!user) {
      return false;
    }
    return true;
  }
}
