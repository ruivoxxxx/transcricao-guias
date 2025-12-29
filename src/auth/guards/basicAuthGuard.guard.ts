import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class BasicAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const auth = req.headers.authorization;

        if (!auth || !auth.startsWith('Basic ')) {
            throw new UnauthorizedException();
        }

        const base64 = auth.replace('Basic ', '');
        const [user, pass] = Buffer.from(base64, 'base64')
            .toString()
            .split(':');

        if (user !== 'santoid' || pass !== 'webhook') {
            throw new UnauthorizedException();
        }

        return true;
    }
}
