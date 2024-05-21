import { AbilityBuilder, ExtractSubjectType, PureAbility } from '@casl/ability';
import { PrismaQuery, Subjects, createPrismaAbility } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { PermissionService } from 'src/permission/permission.service';

export type AppAbility = PureAbility<[string, Subjects<any>], PrismaQuery>;

@Injectable()
export class CaslAbilityFactory {
    constructor(private readonly permissionService: PermissionService) { }

    async createForUser(userId: number): Promise<AppAbility> {
        const permissions = await this.permissionService.getUserPermissions(userId);

        const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

        // Define abilities based on permissions
        permissions.forEach(permission => {
            if (permission.effect) {
                can(permission.action, permission.resource)
            } else {
                cannot(permission.action, permission.resource)
            }
        });

        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects<any>>,
        });
    }
}
