import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AppAbility } from 'src/casl/caslAbilityFactory';
import { ActionAuthorization } from 'src/common/enums/action-authorization.enum';
import { CheckPolicies } from 'src/iam/authorization/decorators/policies.decorator';
import { PoliciesGuard } from 'src/iam/authorization/guards/policies.guard';

@Controller('test')
@UseGuards(PoliciesGuard)
export class TestController {
    constructor() { }

    @Post('create-user')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionAuthorization.Create, 'user'))
    async createUser() {
        return { message: 'User created successfully' };
    }

    @Get('user/:userId')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionAuthorization.Read, 'user'))
    async getUserPermissions(@Param('userId') userId: number) {
        return userId
    }
}
