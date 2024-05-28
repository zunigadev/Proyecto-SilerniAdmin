import { PrismaClient } from '@prisma/client';
import { ActionAuthorization } from '../src/common/enums/action-authorization.enum';

const prisma = new PrismaClient();

async function main() {
    const roles = [
        { name: 'director', description: 'Director' },
        { name: 'teacher', description: 'Teacher' },
        { name: 'tutor', description: 'Student representative or person responsible' },
        { name: 'student', description: 'Student of school' },
    ];

    const permissions = [
        { name: 'createApplication', effect: true, resource: 'application', action: ActionAuthorization.Create },
        { name: 'updateApplication', effect: true, resource: 'application', action: ActionAuthorization.Update },
    ];

    // Insert roles
    for (const role of roles) {
        await prisma.role.upsert({
            where: { name: role.name },
            update: {},
            create: role,
        });
    }

    // Insert permissions
    for (const permission of permissions) {
        await prisma.permission.upsert({
            where: { name: permission.name },
            update: {},
            create: permission,
        });
    }

    // Create RolePermissions
    const tutorRole = await prisma.role.findUniqueOrThrow({ where: { name: 'Tutor' } });
    const createApplicationPermission = await prisma.permission.findUniqueOrThrow({ where: { name: 'createApplication' } });

    if (tutorRole && createApplicationPermission) {
        await prisma.rolePermission.upsert({
            where: { roleId_permissionId: { roleId: tutorRole.id, permissionId: createApplicationPermission.id } },
            update: {},
            create: { roleId: tutorRole.id, permissionId: createApplicationPermission.id },
        });
    }

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
