import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormProps } from "react-hook-form";
import type { z } from "zod";

export function useEntityForm<
  TSchema extends z.ZodTypeAny,
  TValues extends z.infer<TSchema>
>(params: {
  schema: TSchema;
  defaultValues: UseFormProps<TValues>["defaultValues"];
  mode?: UseFormProps<TValues>["mode"];
}) {
  const { schema, defaultValues, mode = "onChange" } = params;
  return useForm<TValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode,
  });
}

