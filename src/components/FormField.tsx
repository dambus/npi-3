import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'
import { cn } from '../lib/cn'

type FieldType = 'text' | 'email' | 'tel' | 'number' | 'password' | 'url'

type SharedProps = {
  id: string
  label: string
  hint?: string
  error?: string
  controlClassName?: string
  required?: boolean
}

type InputFieldProps = SharedProps &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type' | 'children' | 'id'
  > & {
    type?: FieldType
  }

type TextAreaFieldProps = SharedProps &
  Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'size' | 'children' | 'id'
  > & {
    type: 'textarea'
  }

type SelectOption = {
  value: string
  label: string
}

type SelectFieldProps = SharedProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'children' | 'id'> & {
    type: 'select'
    options: SelectOption[]
  }

export type FormFieldProps =
  | InputFieldProps
  | TextAreaFieldProps
  | SelectFieldProps

const baseControlClasses =
  'block w-full rounded-xl border border-brand-neutral/30 bg-white px-4 py-3 text-base text-brand-primary shadow-[0_1px_2px_rgba(8,20,40,0.08)] transition placeholder:text-brand-neutral/60 focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary/30 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-brand-neutral'

export function FormField(props: FormFieldProps) {
  const { id, label, hint, error, controlClassName, required, ...rest } =
    props as FormFieldProps & Record<string, unknown>

  const describedBy = [
    error ? `${id}-error` : null,
    hint ? `${id}-hint` : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined

  const controlClasses = cn(
    baseControlClasses,
    error
      ? 'border-feedback-danger focus:border-feedback-danger focus:ring-feedback-danger/30'
      : '',
    controlClassName,
  )

  return (
    <div className="flex flex-col gap-2" data-field>
      <label
        htmlFor={id}
        className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary"
      >
        {label}
        {required ? (
          <span className="ml-1 text-feedback-danger" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>

      {renderControl({
        id,
        error,
        describedBy,
        controlClasses,
        props: rest,
      })}

      {error ? (
        <p
          id={`${id}-error`}
          className="text-xs font-semibold text-feedback-danger"
        >
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-brand-neutral">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

function renderControl({
  id,
  error,
  describedBy,
  controlClasses,
  props,
}: {
  id: string
  error?: string
  describedBy?: string
  controlClasses: string
  props: Record<string, unknown>
}) {
  const normalized = { ...props }
  const typeValue = normalized.type as string | undefined
  delete normalized.type

  if (typeValue === 'textarea') {
    const rows = (normalized.rows as number | undefined) ?? 5
    delete normalized.rows
    return (
      <textarea
        id={id}
        rows={rows}
        {...(normalized as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        className={cn(controlClasses, 'resize-none leading-relaxed')}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
    )
  }

  if (typeValue === 'select') {
    const options = (normalized.options as SelectOption[]) ?? []
    delete normalized.options
    return (
      <div className="relative">
        <select
          id={id}
          {...(normalized as SelectHTMLAttributes<HTMLSelectElement>)}
          className={cn(controlClasses, 'appearance-none pr-12')}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-brand-neutral">
          ▾
        </span>
      </div>
    )
  }

  const inputType = (typeValue as FieldType | undefined) ?? 'text'
  return (
    <input
      id={id}
      type={inputType}
      {...(normalized as InputHTMLAttributes<HTMLInputElement>)}
      className={controlClasses}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy}
    />
  )
}

export default FormField
