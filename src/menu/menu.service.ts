import { Injectable } from '@nestjs/common';
import { TransactionContext } from 'src/common/contexts/transaction.context';
import { BaseService } from 'src/common/services/base.service';
import { Menu } from 'src/generated/nestjs-dto/menu.entity';
import { PermissionService } from 'src/permission/permission.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenuService extends BaseService {

    constructor(
        protected readonly prismaService: PrismaService,
        private readonly permissionService: PermissionService
    ) {
        super(prismaService)
    }

    // get list of menus of user
    async getUserMenus(userId: number, txContext?: TransactionContext): Promise<Menu[]> {
        const prisma = this.getPrismaClient(txContext);


        const userPermissions = await this.permissionService.getUserPermissions(userId, txContext);

        // this return (menu --> parent)
        const menus = await prisma.menu.findMany({
            where: {
                permissions: {
                    some: {
                        id: {
                            in: userPermissions.map(p => p.id),
                        },
                    },
                },
            },
            // include max two levels
            include: {
                parent: {
                    include: {
                        parent: true
                    },
                },
            },
        });

        // build reverse result (parent --> childrens (submenus))
        const result = [];

        menus.forEach(menu => {
            if (menu.parentId) {
                const parent = {
                    ...menu.parent,
                    submenus: [],
                }
                menu.parent = null
                parent.submenus.push(menu);

                if (parent.parentId) {
                    const grandParent = {
                        ...parent.parent,
                        submenus: [],
                    }
                    parent.parent = null
                    grandParent.submenus.push(parent)

                    result.push(grandParent);
                } else {
                    result.push(parent);
                }
            } else {
                result.push(menu)
            }
        });

        return result;
    }

}
