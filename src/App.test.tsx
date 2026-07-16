import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('商品詳細への画面遷移', () => {
  it('商品カードから対応する詳細ページへ遷移する', () => {
    renderAt('/');

    fireEvent.click(
      screen.getByRole('link', {
        name: /ソーラー充電式フラッシュライト/,
      }),
    );

    expect(
      screen.getByRole('heading', {
        name: 'ソーラー充電式フラッシュライト',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('¥2,480')).toBeInTheDocument();
  });

  it('詳細ページから一覧へ戻り、検索状態を維持する', () => {
    renderAt('/');
    const searchInput = screen.getByRole('searchbox', { name: '商品を検索' });

    fireEvent.change(searchInput, { target: { value: 'ランタン' } });
    fireEvent.click(
      screen.getByRole('link', {
        name: /キャンプランタン/,
      }),
    );
    fireEvent.click(
      screen.getByRole('link', {
        name: '← 商品一覧へ戻る',
      }),
    );

    expect(screen.getByRole('searchbox', { name: '商品を検索' })).toHaveValue(
      'ランタン',
    );
    expect(screen.getByText('1 件の商品')).toBeInTheDocument();
  });

  it('存在しない商品IDでは案内と一覧へのリンクを表示する', () => {
    renderAt('/product/999');

    expect(
      screen.getByRole('heading', { name: '商品が見つかりません' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: '← 商品一覧へ戻る' }),
    ).toHaveAttribute('href', '/');
  });
});
