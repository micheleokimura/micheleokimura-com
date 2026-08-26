import { cn } from '@/lib/cn'

type ContainerProps<T extends React.ElementType> = {
  as?: T
  className?: string
  children: React.ReactNode
}

export function Container<T extends React.ElementType = 'div'>({
  as,
  className,
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, keyof ContainerProps<T>> &
  ContainerProps<T>) {
  const Component = as ?? 'div'

  return (
    // `gutter-x` is the old `px-6 lg:px-8` with max() floors so the gutter
    // grows to clear the notch when a phone is held in landscape, and is
    // identical to the old value everywhere else. Declared in tailwind.css.
    <Component className={cn('mx-auto max-w-7xl gutter-x', className)}>
      <div className="mx-auto max-w-2xl lg:max-w-none">{children}</div>
    </Component>
  )
}
