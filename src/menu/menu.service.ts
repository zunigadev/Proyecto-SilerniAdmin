import { Injectable } from '@nestjs/common';
import { Menu } from 'src/generated/nestjs-dto/menu.entity';
import { PermissionService } from 'src/permission/permission.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenuService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly permissionService: PermissionService
    ) { }

    // get list of menus of user
    async getUserMenus(userId: number): Promise<Menu[]> {
        const userPermissions = await this.permissionService.getUserPermissions(userId);

        return this.prismaService.menu.findMany({
            where: {
                permissions: {
                    some: {
                        id: {
                            in: userPermissions.map(p => p.id),
                        },
                    },
                },
            },
            // include maximo two levels
            include: {
                parent: {
                    include: {
                        parent: true
                    },
                },
            },
        });
    }

}
