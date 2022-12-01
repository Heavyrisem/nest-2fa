import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveRoleGroupDto } from './dto/save-role-group.dto';
import { SaveRoleDto } from './dto/save-role.dto';
import { RoleGroup } from './entity/role-group.entity';
import { Role, Roles } from './entity/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(RoleGroup) private readonly roleGroupRepository: Repository<RoleGroup>,
  ) {}

  async saveRole({ name, description }: SaveRoleDto) {
    const existRole = await this.findRoleByName(name);

    const newRole = existRole || this.roleRepository.create();
    newRole.name = name;
    newRole.description = description;

    return await this.roleRepository.save(newRole);
  }

  async saveRoleGroup({ name, description, roles }: SaveRoleGroupDto) {
    const existRoleGroup = await this.findRoleGroupByName(name);

    // const relatedRoles = await this.findRolesById(roles);
    const newRoleGroup = existRoleGroup || this.roleGroupRepository.create();
    newRoleGroup.name = name;
    newRoleGroup.description = description;
    newRoleGroup.roles = roles;

    return await this.roleGroupRepository.save(newRoleGroup);
  }

  async findRolesById(arr: number[]) {
    return Promise.all(arr.map((id) => this.roleRepository.findOne({ where: { id } })));
  }

  async findRoleByName(name: Roles) {
    return this.roleRepository.findOne({ where: { name } });
  }

  async findRoleGroupByName(name: string) {
    return this.roleGroupRepository.findOne({ where: { name } });
  }
}
