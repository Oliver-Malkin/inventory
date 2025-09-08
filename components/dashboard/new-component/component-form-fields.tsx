import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import {
  CheckIcon,
  ChevronUpDownIcon
} from "@heroicons/react/24/outline"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

import { z } from "zod"
import { UseFormReturn } from "react-hook-form"
import { componentSchema } from "@/lib/zod-schemas"

type ComponentFormValues = z.infer<typeof componentSchema>

interface ComponentFormFieldsProps {
  form: UseFormReturn<ComponentFormValues>
  categories: {
    label: string
    value: string
  }[]
  edit: boolean
}

export function ComponentFormFields({
  form,
  categories,
  edit
}: ComponentFormFieldsProps
) {
  return (
    <>
      <FormField
        control={form.control}
        name="ptNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Component part number</FormLabel>
            <FormControl>
              <Input placeholder="Part number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="qty"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantity</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Quantity"
                {...field}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value === "" ? undefined : e.target.valueAsNumber)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Link to the product page</FormLabel>
            <FormControl>
              <Input placeholder="Link" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Component category</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? categories.find(
                        (category) => category.value === field.value
                      )?.label
                      : "Select category"}
                    <ChevronUpDownIcon className="size-5" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput
                    placeholder="Search category..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          value={category.label}
                          key={category.value}
                          onSelect={() => {
                            form.setValue("category", category.value)
                          }}
                        >
                          {category.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto",
                              category.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      {!edit &&
        <FormField
          control={form.control}
          name="addAnother"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Add another product after submitting</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      }
    </>
  )
}
