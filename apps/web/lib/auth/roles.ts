export const APP_ROLES = [
  'dev',
  'admin',
  'diretoria',
  'gerente',
  'gerente_marketing',
  'gestor_trafego',
  'vendedor',
  'pre_venda',
] as const;

export type AppRole = (typeof APP_ROLES)[number];

export const ROLE_PRIORITY: Record<AppRole, number> = {
  dev: 100,
  admin: 90,
  diretoria: 80,
  gerente: 70,
  gerente_marketing: 60,
  gestor_trafego: 60,
  vendedor: 50,
  pre_venda: 50,
};

export function hasRequiredRole(userRole: AppRole | null, required: AppRole) {
  if (!userRole) {
    return false;
  }

  return ROLE_PRIORITY[userRole] >= ROLE_PRIORITY[required];
}
