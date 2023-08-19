import {Button} from "../../Button";
import {getPageSpread} from "../utils/getPageSpread";
import React from "react";

export const Pagination = ({
                               fetchData, theme,
                               pageValue, pageCount, pageSize, pageIndex,
                               statePageSize, totalRecords, rows,
                               canNextPage,
                               onPageSelect, onPrevPage, onNextPage,
                               previousPage, gotoPage, nextPage
                           }) => {
    if(pageCount <= 1) return null;

    return (
        <div className={`flex items-center ${theme.textInfo}`}>
            <div className="flex-0">
                Page {pageValue + 1} of {pageCount}
                <br/>{/*<span className="font-extrabold">&nbsp; | &nbsp;</span>*/}
                Rows {pageValue * pageSize + 1} -
                {
                    !fetchData ?
                        Math.min(rows.length, pageIndex * statePageSize + statePageSize) :
                        Math.min(totalRecords, pageValue * pageSize + pageSize)
                } of {!fetchData ? rows.length : totalRecords}
            </div>
            <div className={`flex-1 flex justify-end items-center`}>
                <Button disabled={(pageValue) === 0} themeOptions={{size: 'sm'}}
                        onClick={e => !fetchData ? gotoPage(0) : onPageSelect(0)}>
                    {"<<"}
                </Button>
                <Button disabled={pageValue === 0} themeOptions={{size: 'sm'}}
                        onClick={e => !fetchData ? previousPage() : onPrevPage()}>
                    {"<"}
                </Button>
                {getPageSpread(pageValue, pageCount - 1)
                    .map(p => {
                        const active = (p === (pageValue));
                        return (
                            <Button key={p} themeOptions={{size: 'sm', color: active ? 'primary' : 'white'}}
                                    onClick={active ? null : e => !fetchData ? gotoPage(p) : onPageSelect(p)}>
                                {p + 1}
                            </Button>
                        )
                    })
                }
                <Button disabled={!fetchData ? !canNextPage : (pageValue === pageCount - 1)}
                        themeOptions={{size: 'sm'}}
                        onClick={e => !fetchData ? nextPage(0) : onNextPage(e)}>
                    {">"}
                </Button>
                <Button disabled={(pageValue === (pageCount - 1))}
                        themeOptions={{size: 'sm'}}
                        onClick={e => !fetchData ? gotoPage(pageCount - 1) : onPageSelect(pageCount - 1)}>
                    {">>"}
                </Button>
            </div>
        </div>
    )
}