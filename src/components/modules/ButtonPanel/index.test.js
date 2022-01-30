import { render, screen } from '@testing-library/react';

import ButtonPanel from './index';

jest.mock('../InputButton', () => ({
    __esModule: true,
    default: ({ val }) => {
        return <button>{val}</button>
    }
}));
jest.mock('../UndoButton', () => ({
    __esModule: true,
    default: ({ val }) => {
        return <button>←</button>
    }
}));
jest.mock('../ClearButton', () => ({
    __esModule: true,
    default: ({ val }) => {
        return <button>C</button>
    }
}));
jest.mock('../CalculateButton', () => ({
    __esModule: true,
    default: ({ val }) => {
        return <button>=</button>
    }
}));

describe('<ButtonPanel />', () => {
    it('should display the input buttons', () => {
        const nums = new Array(10).fill(null).map((__, i) => i);
        const arithmeticSymbols = ['+', '-', '*', '/', '^'];

        render(<ButtonPanel />);

        for (let num of nums) {
            expect(screen.getByText(num)).toBeInTheDocument();
        }
        expect(screen.getByText('.')).toBeInTheDocument();
        expect(screen.getByText('(')).toBeInTheDocument();
        expect(screen.getByText(')')).toBeInTheDocument();

        for (let sym of arithmeticSymbols) {
            expect(screen.getByText(sym)).toBeInTheDocument();
        }
    });

    it('should display the undo button', () => {
        render(<ButtonPanel />);
        expect(screen.getByText('←')).toBeInTheDocument();
    });

    it('should display the clear button', () => {
        render(<ButtonPanel />);
        expect(screen.getByText('C')).toBeInTheDocument();
    });

    it('should display the calculate button', () => {
        render(<ButtonPanel />);
        expect(screen.getByText('=')).toBeInTheDocument();
    });
});
