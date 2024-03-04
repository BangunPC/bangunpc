import { Resource, component$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import FilledButton from "~/components/common/filled-button";
import { getComponentsPaginated } from "~/lib/db_functions/all_components";

export default component$(() => {

    const loc = useLocation();
    const nav = useNavigate();

    const page = loc.url.searchParams.get('page') ? parseInt(loc.url.searchParams.get('page')!) : 1;
    const size = loc.url.searchParams.get('size') ? parseInt(loc.url.searchParams.get('size')!) : 20;
    const fetchData = getComponentsPaginated(page, size, '');

    return (
        <div class="mt-2 p-4 max-w-7xl w-full m-auto">
            <Resource
                value={fetchData}
                onPending={() => <div>Loading...</div>}
                onResolved={(value) => {
                    const { data, count } = value;
                    const currentPage = (page > (count ?? 0) || page < 1) ? 1 : page
                    const totalPage = Math.floor((count ?? 0) / size);
                    const pagination = <div class='flex flex-row gap-2 items-center justify-evenly'>
                        <div class='w-24'>
                            {currentPage > 1 && (
                                <FilledButton
                                    class='flex w-full'
                                    onClick$={() => {

                                        const url = loc.url;
                                        url.searchParams.set('page', (currentPage - 1).toString());
                                        window.history.pushState({}, '', url);

                                        nav();
                                    }}>
                                    <span class='m-auto'>
                                        Previous
                                    </span>
                                </FilledButton>
                            )}
                        </div>
                        <div>
                            <select
                                class='border-2 rounded-md'
                                onChange$={(event) => {
                                    const url = loc.url;
                                    url.searchParams.set('page', event.target.value);
                                    window.history.pushState({}, '', url);

                                    nav();
                                }}
                            >
                                {Array.from({ length: totalPage }, (_, index) => (
                                    <option key={index} value={index + 1} selected={index + 1 === currentPage}>
                                        {`Page ${index + 1}`}
                                    </option>
                                ))}
                            </select> / {totalPage}
                        </div>
                        <div class='w-24'>
                            {currentPage < totalPage && (
                                <FilledButton
                                    class='flex w-full'
                                    onClick$={() => {
                                        const url = loc.url;
                                        url.searchParams.set('page', (currentPage + 1).toString());
                                        window.history.pushState({}, '', url);

                                        nav();
                                    }}
                                >
                                    <span class='m-auto'>
                                        Next
                                    </span>
                                </FilledButton>
                            )}
                        </div>
                    </div>;
                    return (
                        <>
                            {pagination}
                            <div>
                                {data?.map((product: {
                                    brand_id: number | null;
                                    brand_name: string | null;
                                    category_id: number | null;
                                    category_name: string | null;
                                    description: string | null;
                                    lowest_price: number | null;
                                    product_id: number | null;
                                    product_name: string | null;
                                    review_urls: string[] | null;
                                    slug: string | null;
                                    spec_url: string | null;
                                }) => (
                                    <div key={product.product_id}>
                                        <p>{product.product_name}</p>
                                    </div>
                                ))}
                            </div>
                            {pagination}
                        </>
                    )
                }}
            />
        </div>
    )
})