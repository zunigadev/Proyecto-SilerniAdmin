import { Injectable, OnModuleInit } from '@nestjs/common';
import { MetadataScanner, ModulesContainer, Reflector } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { Permission } from 'src/generated/nestjs-dto/permission.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionService implements OnModuleInit {

    constructor(
        private readonly prisma: PrismaService,
        private readonly reflector: Reflector,
        private readonly modulesContainer: ModulesContainer,
        private readonly metadataScanner: MetadataScanner,
    ) { }
    async onModuleInit() {
        await this.registerPermissionsFromControllers();
    }

    async registerPermissionsFromControllers() {
        // const permissions: CreatePermissionDto[] = [];

        // todo: get permissions from controllers

    }

    // assign permissions to user
    async assignPermissionsToUser(userId: number, permissionIds: number[]): Promise<any> {

        return await this.prisma.$transaction(async (tx: PrismaClient) => {

            // Disconnect existing permissions
            await tx.user.update({
                where: { idUser: userId },
                data: {
                    permissions: {
                        set: [],
                    },
                },
            });

            // Connect new permissions
            return tx.user.update({
                where: { idUser: userId },
                data: {
                    permissions: {
                        connect: permissionIds.map(id => ({ id })),
                    },
                },
            });
        })
    }

    // get list of permissions of user
    async getUserPermissions(userId: number): Promise<Permission[]> {
        const userWithPermissions = await this.prisma.user.findUnique({
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
