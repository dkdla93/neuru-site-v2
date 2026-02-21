'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  // 최대 5개 페이지 번호 표시
  const getPageNumbers = () => {
    const pages: number[] = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="mt-10 flex justify-center items-center gap-1" aria-label="페이지 네비게이션">
      {/* 이전 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded text-[13px] text-[#666] hover:text-[#4a7c59] hover:bg-[#e8f0eb] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="이전 페이지"
      >
        ‹
      </button>

      {/* 첫 페이지 + 생략 */}
      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-8 h-8 flex items-center justify-center rounded text-[13px] text-[#666] hover:text-[#4a7c59] hover:bg-[#e8f0eb] transition-colors"
          >
            1
          </button>
          {pageNumbers[0] > 2 && (
            <span className="w-8 h-8 flex items-center justify-center text-[13px] text-[#aaa]">…</span>
          )}
        </>
      )}

      {/* 페이지 번호 */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 flex items-center justify-center rounded text-[13px] transition-colors ${
            page === currentPage
              ? 'bg-[#4a7c59] text-white font-semibold'
              : 'text-[#666] hover:text-[#4a7c59] hover:bg-[#e8f0eb]'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {/* 마지막 페이지 + 생략 */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="w-8 h-8 flex items-center justify-center text-[13px] text-[#aaa]">…</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-8 h-8 flex items-center justify-center rounded text-[13px] text-[#666] hover:text-[#4a7c59] hover:bg-[#e8f0eb] transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* 다음 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded text-[13px] text-[#666] hover:text-[#4a7c59] hover:bg-[#e8f0eb] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="다음 페이지"
      >
        ›
      </button>
    </nav>
  );
}
