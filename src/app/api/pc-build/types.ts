export const runtime = "edge";

import { z } from 'zod';

// Component Build Schema
export const ComponentBuildSchema = z.object({
  productId: z.number().min(1, {message: 'must be greater than 0'}),
  detailId: z.number().min(1, {message: 'must be greater than 0'}).optional()
});

// PC Build Schema
export const PCBuildSchema = z.object({
  cpu: ComponentBuildSchema.optional(),
  mobo: ComponentBuildSchema.optional(),
  gpu: ComponentBuildSchema.optional(),
  psu: ComponentBuildSchema.optional(),
  casing: ComponentBuildSchema.optional(),
  storages: z.array(ComponentBuildSchema).optional(),
  memories: z.array(ComponentBuildSchema).optional(),
  monitors: z.array(ComponentBuildSchema).optional()
}).refine(
  (data) => {
    const values = Object.values(data);
    return values.some(value => 
      value !== undefined && 
      (!Array.isArray(value) || value.length > 0)
    );
  },
  {
    message: 'At least one component must be provided'
  }
);

export type PCBuildType = z.infer<typeof PCBuildSchema>;