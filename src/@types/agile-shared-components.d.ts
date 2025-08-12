declare module '@agile-software/shared-components' {
  export const createCustomTheme: (config: Record<string, unknown>) =>
    | { $$joy: Record<string, unknown> }
    | {
        cssVarPrefix?: string;
        colorSchemes: Record<string, Record<string, unknown>>;
      };
}
