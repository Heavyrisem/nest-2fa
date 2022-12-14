import { JwtPayload } from 'jsonwebtoken';
import { Roles } from '~src/role/entity/role.entity';

export interface JwtAuthPayload extends JwtPayload {
  id: number;
  twoFactorAuthenticated: boolean;
  roles: Roles[] | null;
}
