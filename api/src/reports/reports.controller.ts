import {
  Controller,
  Get,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard/jwt.guard';

@Controller('reports')
export class ReportsController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getReports(@Request() req) {
    const roles = req?.user?.realm_access?.roles || [];

    if (roles.includes('prothetic_user')) {
      return {
        report: 'Сгенерированный отчёт для prothetic_user',
        data: [
          { id: 1, value: 'Данные 1' },
          { id: 2, value: 'Данные 2' },
        ],
      };
    } else {
      throw new ForbiddenException('У вас нет доступа к этому ресурсу.');
    }
  }
}
