import { useMolecules } from '@bambooapp/bamboo-molecules';
import { FC, PropsWithChildren, PureComponent } from 'react';

export class ErrorBoundary extends PureComponent<PropsWithChildren<{ defaultMessage?: string }>> {
    state = {
        hasError: false,
        error: null as Error | null,
    };

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            // TODO: Add Translations
            return (
                <RenderErrored
                    message={
                        this.state.error?.message ??
                        this.props.defaultMessage ??
                        'Something went wrong'
                    }
                />
            );
        }

        return this.props.children;
    }
}

const RenderErrored: FC<{ message: string }> = ({ message }) => {
    const { View, Text } = useMolecules();

    return (
        <View>
            <Text>{message}</Text>
        </View>
    );
};
