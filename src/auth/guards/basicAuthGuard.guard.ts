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

        console.log('HEADERS RECEBIDOS:', req.headers);

        const auth = req.headers.authorization;

        if (!auth) {
            console.log('❌ Authorization não veio');
            throw new UnauthorizedException('Authorization header ausente');
        }

        console.log('Authorization recebido:', auth);

        if (!auth.startsWith('Basic ')) {
            throw new UnauthorizedException('Não é Basic Auth');
        }

        const base64 = auth.replace('Basic ', '');
        const decoded = Buffer.from(base64, 'base64').toString('utf-8');

        console.log('Basic decodificado:', decoded);

        const [user, pass] = decoded.split(':');

        console.log('USER:', user);
        console.log('PASS:', pass);

        if (
            user !== process.env.WEBHOOK_BASIC_USER ||
            pass !== process.env.WEBHOOK_BASIC_PASS
        ) {
            console.log('❌ Credenciais não bateram');
            throw new UnauthorizedException('Credenciais inválidas');
        }

        console.log('✅ Auth OK');
        return true;
    }
}
