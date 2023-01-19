import { FC, PropsWithChildren } from 'react';
import { RecordType } from '../../src/types';

export type CreateTestWrapper<P extends { records?: RecordType[] } = any> = (
    Wrapper: FC<PropsWithChildren<any>>,
    props: P,
) => FC<PropsWithChildren>;

export const createTestWrapper: CreateTestWrapper = (
    Wrapper: FC<PropsWithChildren<any>>,
    { records = [], ...props },
): FC<PropsWithChildren> => {
    return ({ children }) => {
        return (
            <Wrapper records={records} {...props}>
                {children}
            </Wrapper>
        );
    };
};
