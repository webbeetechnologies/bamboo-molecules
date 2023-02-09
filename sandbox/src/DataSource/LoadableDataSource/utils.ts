import { ELoadableActions, Loading } from './types';

export const getLoadingStatus = (args: { loading: Loading }) => {
    const { loading } = args;
    const { startedAt = 0, finishedAt = 0, erroredAt = 0 } = loading || {};

    const maxTime = Math.max(0, Number(finishedAt), Number(erroredAt), Number(startedAt));
    const hasStarted = maxTime > 0;

    return {
        isLoadable: true,
        hasStarted: hasStarted,
        isLoading: hasStarted && maxTime === startedAt,
        hasLoaded: hasStarted && maxTime === finishedAt,
        hasErrored: hasStarted && maxTime === erroredAt,
    };
};

export const isLoadableAction = (action: any) => action in ELoadableActions;
