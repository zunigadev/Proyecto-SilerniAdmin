import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TransactionContext } from 'src/common/contexts/transaction.context';
import { BaseService } from 'src/common/services/base.service';
import { Permission } from 'src/generated/nestjs-dto/permission.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionService extends BaseService implements OnModuleInit {

    constructor(
        protected readonly prisma: PrismaService,
    ) {
        super(prisma)
    }
    async onModuleInit() {
        await this.registerPermissionsFromControllers();
    }

    async registerPermissionsFromControllers() {
        // const permissions: CreatePermissionDto[] = [];

        // todo: get permissions from controllers

    }

    // assign permissions to user
    async assignPermissionsToUser(userId: number, permissionIds: number[], txContext?: TransactionContext): Promise<any> {
        const prisma = this.getPrismaClient(txContext);

        const updatePermissions = async (prismaClient: PrismaClient) => {
            // Disconnect existing permissions
            await prismaClient.user.update({
                where: { idUser: userId },
                data: {
                    permissions: {
                        set: [],
                    },
                },
            });

            // Connect new permissions
            return prismaClient.user.update({
                where: { idUser: userId },
                data: {
                    permissions: {
                        connect: permissionIds.map(id => ({ id })),
                    },
                },
            });
        };

        if (txContext) {
            // Use the provided transaction context
            return updatePermissions(prisma);
        } else {
            // Create a new transaction
            return await prisma.$transaction(updatePermissions);
        }
    }

    // get list of permissions of user
    async getUserPermissions(userId: number, txContext?: TransactionContext): Promise<Permission[]> {
        const prisma = this.getPrismaClient(txContext)

        const userWithPermissions = await prisma.user.findUnique({
            where: { idUser: userId },
            select: {
                permissions: {
                    select: {
                        permission: true
                    }
                },
                roles: {
                    select: {
                        role: {
                            select: {
                                permissions: {
                                    select: {
                                        permission: true
                                    }
                                },
                            },
                        },
                    },
                },
            },
        });

        const rolePermissions = userWithPermissions.roles.flatMap(ur => ur.role.permissions.map(rp => rp.permission));
        const userPermissions = userWithPermissions.permissions.map(up => up.permission);

        return [...new Set([...rolePermissions, ...userPermissions])];
    }

}
