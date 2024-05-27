import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AppAbility } from 'src/casl/caslAbilityFactory';
import { ActionAuthorization } from 'src/common/enums/action-authorization.enum';
import { AuthType } from 'src/common/enums/auth-type.enum';
import { Auth } from 'src/iam/auth/decorators/auth.decorator';
import { CheckPolicies } from 'src/iam/authorization/decorators/policies.decorator';
import { PoliciesGuard } from 'src/iam/authorization/guards/policies.guard';
import { MailerService } from 'src/mailer/mailer.service';

@Controller('test')
@UseGuards(PoliciesGuard)
export class TestController {
    constructor(private readonly mailerService: MailerService) { }

    @Post('create-user')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionAuthorization.Create, 'user'))
    async createUser() {
        return { message: 'User created successfully' };
    }

    @Get('user/:userId')
    // @CheckPolicies((ability: AppAbility) => ability.can(ActionAuthorization.Read, 'user'))
    async getUserPermissions(@Param('userId') userId: number) {
        return {
            success: true,
            userId
        }
    }

    @Get('send-email')
    @Auth(AuthType.None)
    async sendEmail() {
        return this.mailerService.sendMail('test', 'full01@silerni.com', 1, {
            name: 'full01',
            linkEmailToken: 'https://developers.brevo.com/reference/sendtransacemail',
        })
    }

}
