import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './caslAbilityFactory';
import { PermissionModule } from 'src/permission/permission.module';

@Module({
    imports: [PermissionModule],
    providers: [CaslAbilityFactory],
    exports: [CaslAbilityFactory],
})
export class CaslModule { }
