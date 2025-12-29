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
            throw new UnauthorizedException('Authorization header ausente');
        }

        const base64 = auth.replace('Basic ', '');
        const decoded = Buffer.from(base64, 'base64').toString('utf-8');
        const [user, pass] = decoded.split(':');

        if (
            user !== process.env.WEBHOOK_BASIC_USER ||
            pass !== process.env.WEBHOOK_BASIC_PASS
        ) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        return true;
    }
}
