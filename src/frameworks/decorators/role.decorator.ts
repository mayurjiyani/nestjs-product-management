import { SetMetadata } from '@nestjs/common';
import { ROLES } from '../enums';

export const Role = (...role: ROLES[]) => SetMetadata('role', role);
