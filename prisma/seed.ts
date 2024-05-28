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

    const applicationMenu = await prisma.menu.upsert({
        where: { name: 'Application' },
        update: {},
        create: { name: 'Application' },
    });

    await prisma.menu.upsert({
        where: { name: 'Create Application' },
        update: {},
        create: {
            name: 'Create Application',
            parentId: applicationMenu.id,

            // added relation with permission
            permissions: {
                connect: { name: 'createApplication' },
            },
        },
    });

    // Create RolePermissions
    const tutorRole = await prisma.role.findUniqueOrThrow({ where: { name: 'tutor' } });
    const createApplicationPermission = await prisma.permission.findUniqueOrThrow({ where: { name: 'createApplication' } });

    if (tutorRole && createApplicationPermission) {
        await prisma.rolePermission.upsert({
            where: { roleId_permissionId: { roleId: tutorRole.id, permissionId: createApplicationPermission.id } },
            update: {},
            create: { roleId: tutorRole.id, permissionId: createApplicationPermission.id },
        });
    }

    console.log('Seed executed successfully')
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
