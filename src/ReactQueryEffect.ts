import * as RQ from '@tanstack/react-query'
import * as Exit from 'effect/Exit'

export const queryOptions = <
  A,
  E,
  TQueryFnData extends Exit.Exit<A, E>,
  TData = TQueryFnData,
  TQueryKey extends RQ.QueryKey = RQ.QueryKey,
>(
  options: RQ.UndefinedInitialDataOptions<TQueryFnData, never, TData, TQueryKey>
) => RQ.queryOptions(options)

interface UseEffectSuspenseQueryOptions<
  A,
  E,
  TQueryFnData extends Exit.Exit<A, E>,
  TData = TQueryFnData,
  TQueryKey extends RQ.QueryKey = readonly unknown[],
> extends RQ.UseSuspenseQueryOptions<TQueryFnData, never, TData, TQueryKey> {}

interface UseQueryOptions<
  TQueryFnData extends Exit.Exit<unknown, unknown> = Exit.Exit<
    unknown,
    unknown
  >,
  TData = TQueryFnData,
  TQueryKey extends RQ.QueryKey = readonly unknown[],
> extends RQ.UseQueryOptions<TQueryFnData, never, TData, TQueryKey> {}

export const useQuery = <
  A,
  E = never,
  TQueryKey extends RQ.QueryKey = readonly unknown[],
>(
  options: UseQueryOptions<Exit.Exit<A, E>, Exit.Exit<A, E>, TQueryKey>
) => {
  const result = RQ.useQuery<
    Exit.Exit<A, E>,
    never,
    Exit.Exit<A, E>,
    TQueryKey
  >(options)

  if (result.isSuccess) {
    if (Exit.isSuccess(result.data)) {
      return {
        ...result,
        data: result.data.value,
      } as const
    } else {
      return {
        ...result,
        isSuccess: false,
        isError: true,
        status: 'error',
        data: undefined,
        error: result.data.cause,
      } as const
    }
  }

  return result
}

export const useSuspenseQuery = <
  A,
  E = never,
  TQueryKey extends RQ.QueryKey = readonly unknown[],
>(
  options: UseEffectSuspenseQueryOptions<
    A,
    E,
    Exit.Exit<A, E>,
    Exit.Exit<A, E>,
    TQueryKey
  >
) => {
  const result = RQ.useSuspenseQuery<
    Exit.Exit<A, E>,
    never,
    Exit.Exit<A, E>,
    TQueryKey
  >(options)

  return result
}
