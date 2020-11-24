import { shallowReadonly } from '@vue/reactivity'
import { getCurrentInstance, SetupContext } from './component'
import { EmitFn, EmitsOptions } from './componentEmits'
import { ComponentObjectPropsOptions, ExtractPropTypes } from './componentProps'
import { warn } from './warning'

/**
 * Compile-time-only helper used for declaring props inside `<script setup>`.
 * This is stripped away in the compiled code and should never be actually
 * called at runtime.
 */
// overload 1: string props
export function defineProps<
  TypeProps = undefined,
  PropNames extends string = string,
  InferredProps = { [key in PropNames]?: any }
>(
  props?: PropNames[]
): Readonly<TypeProps extends undefined ? InferredProps : TypeProps>
// overload 2: object props
export function defineProps<
  TypeProps = undefined,
  PP extends ComponentObjectPropsOptions = ComponentObjectPropsOptions,
  InferredProps = ExtractPropTypes<PP>
>(props?: PP): Readonly<TypeProps extends undefined ? InferredProps : TypeProps>
// implementation
export function defineProps(props?: any) {
  if (__DEV__ && props) {
    warn(
      `defineProps() is a compiler-hint helper that is only usable inside ` +
        `<script setup> of a single file component. Its arguments should be ` +
        `compiled away and passing it at runtime has no effect.`
    )
  }
  return __DEV__
    ? shallowReadonly(getCurrentInstance()!.props)
    : getCurrentInstance()!.props
}

export function defineEmit<
  TypeEmit = undefined,
  E extends EmitsOptions = EmitsOptions,
  EE extends string = string,
  InferredEmit = EmitFn<E>
>(emitOptions?: E | EE[]): TypeEmit extends undefined ? InferredEmit : TypeEmit
// implementation
export function defineEmit(emitOptions?: any) {
  if (__DEV__ && emitOptions) {
    warn(
      `defineEmit() is a compiler-hint helper that is only usable inside ` +
        `<script setup> of a single file component. Its arguments should be ` +
        `compiled away and passing it at runtime has no effect.`
    )
  }
  return getCurrentInstance()!.emit
}

export function useContext(): SetupContext {
  return getCurrentInstance()!.setupContext!
}