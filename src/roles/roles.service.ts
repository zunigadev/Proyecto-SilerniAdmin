import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Adjust the import according to your project structure
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRolesDto } from './dto/update-role.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RolesService {
    constructor(private readonly prisma: PrismaService) { }

    // Create role with permissions
    async createRoleWithPermissions(createRole: CreateRoleDto): Promise<any> {
        return this.prisma.role.create({
            data: {
                name: createRole.name,
                description: createRole.description,
                permissions: {
                    connect: createRole.permissionsIds.map(id => ({ id })),
                },
            },
        });
    }

    // Edit permissions of a role
    async editRolePermissions(updateRolesDto: UpdateRolesDto): Promise<any> {
        // Disconnect existing permissions
        return this.prisma.$transaction(async (tx: PrismaClient) => {
            // Disconnect existing permissions
            await tx.role.update({
                where: { id: updateRolesDto.idRole },
                data: {
                    permissions: {
                        set: [],
                    },
                },
            });

            // Connect new permissions
            return tx.role.update({
                where: { id: updateRolesDto.idRole },
                data: {
                    permissions: {
                        connect: updateRolesDto.permissionIds.map(id => ({ id })),
                    },
                },
            });
        });
    }

    // Assign roles to a user
    async assignRolesToUser(userId: number, roleIds: number[]): Promise<any> {

        return await this.prisma.$transaction(async (tx: PrismaClient) => {

            // Disconnect existing roles
            await tx.user.update({
                where: { idUser: userId },
                data: {
                    roles: {
                        set: [],
                    },
                },
            });

            // Connect new roles
            return tx.user.update({
                where: { idUser: userId },
                data: {
                    roles: {
                        connect: roleIds.map(id => ({ id })),
                    },
                },
            });
        })
    }

    // change status role
    async changeStatusRole(idRole: number, enabled: boolean): Promise<any> {
        return this.prisma.role.update({
            where: {
                id: idRole,
            },
            data: {
                enabled
            }
        })

    }
}
