import CommonText from "../ui/components/CommonText";
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CommonText> = {
    title: 'Components/CommonText',
    component: CommonText,
    argTypes: {
        onChange: { action: 'onChange' }
    }
}

export default meta;

type Story = StoryObj<typeof CommonText>;

export const NoText: Story = {
    args: {
        label: 'no text',
        value: '',
        children: <p>Test</p>
    }
};

export const SampleText: Story = {
    args: {
        label: 'TestLabel',
        value: 'sample',
    }
};
