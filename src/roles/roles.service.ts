import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Adjust the import according to your project structure
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRolesDto } from './dto/update-role.dto';
import { PrismaClient } from '@prisma/client';
import { BaseService } from 'src/common/services/base.service';
import { TransactionContext } from 'src/common/contexts/transaction.context';

@Injectable()
export class RolesService extends BaseService {
    constructor(protected readonly prisma: PrismaService) {
        super(prisma)
    }

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
    async assignRolesToUser(userId: number, roleIds: number[], txContext?: TransactionContext): Promise<any> {
        const prisma = this.getPrismaClient(txContext)

        if (txContext) {
            // Disconnect existing roles
            await prisma.userRole.deleteMany({
                where: { userId },
            });

            // Connect new roles
            const userRoles = roleIds.map(roleId => ({
                userId,
                roleId,
            }));

            return await prisma.userRole.createMany({
                data: userRoles,
                skipDuplicates: true,
            });
        } else {

            return await prisma.$transaction(async (tx: PrismaClient) => {

                // Disconnect existing roles
                await tx.userRole.deleteMany({
                    where: { userId },
                });

                // Connect new roles
                const userRoles = roleIds.map(roleId => ({
                    userId,
                    roleId,
                }));

                return await tx.userRole.createMany({
                    data: userRoles,
                    skipDuplicates: true,
                });
            })
        }
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
