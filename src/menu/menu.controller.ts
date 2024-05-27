import { Controller, Get } from '@nestjs/common';
import { Menu } from 'src/generated/nestjs-dto/menu.entity';
import { AuthUser } from 'src/iam/auth/decorators/auth-user.decorator';
import { MenuService } from './menu.service';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }
    @Get('menus-of-user')
    async getUserMenus(@AuthUser() authUser: ActiveUserData): Promise<Menu[]> {
        return this.menuService.getUserMenus(authUser.sub);
    }

}
