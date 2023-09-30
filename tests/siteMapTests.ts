import { describe, xdescribe, expect, it } from '@jest/globals';
import _ from 'lodash';

describe(
    'siteMap-allfunctions',
    () => {

        function p(...args: any[]): any {

        }

        const site = p(
            'root',
            {
                assessment: p('assessments'),
                assessment: p(
                    (id: number) => 'assessment' + id,
                    {
                        review: 'review',
                    },
                ),
            },
        );

        it(
            '',
            () => {
                site()
                    .assessment(1);
            },
        );
    },
);


xdescribe(
    'sitemap',
    () => {

        type Path<TC extends object, TArgs> = ((...args: TArgs[]) => (string & TC) | (string & TC));

        function path<TC extends object, TArgs>( //
            path: (...args: TArgs[]) => string, //
            children: TC, //
        ): ((...args: TArgs[]) => (string & TC)) {
            return (...args: TArgs[]) => {
                const basePath = path(...args);
                const rebasedChildren = _.mapValues(
                    children,
                    (path) => typeof path === 'function' ? _.wrap(
                        path,
                        (inner, ...args) => {
                            return basePath + '/' + inner(args);
                        },
                    ) : basePath + '/' + path,
                ) as TC;
                return _.assign(
                    basePath,
                    rebasedChildren,
                );
            };
        }

        function pathS<TC extends object, TArgs>( //
            path: string, //
            children: TC, //
        ): (string & TC) {

            const basePath = path;
            const rebasedChildren = _.mapValues(
                children,
                (path) => typeof path === 'function' ? _.wrap(
                    path,
                    (inner, ...args) => {
                        return basePath + '/' + inner(args);
                    },
                ) : basePath + '/' + path,
            ) as TC;
            return _.assign(
                basePath,
                rebasedChildren,
            );

        }

        const siteMap = pathS(
            '',
            {
                home: 'home',
                products: pathS(
                    'products',
                    {
                        new: 'products/new',
                    },
                ),
                product: path(
                    id => 'products/' + id,
                    {
                        bom: 'bom',
                        colorOptions: 'colorOptions',
                        colorOption: path(
                            id => 'colorOption/' + id,
                            {},
                        ),
                        approve: 'approve',
                    },
                ),
            },
        );

        it(
            'one',
            () => {
                expect(siteMap
                    .home
                    .toString())
                    .toEqual('/home');
                expect(siteMap
                    .products
                    .toString())
                    .toEqual('/products');
                expect(siteMap
                    .product(123)
                    .toString())
                    .toEqual('/products/123');
                expect(siteMap
                    .product(123).bom)
                    .toEqual('/products/123/bom');
                expect(siteMap
                    .product(123).colorOptions)
                    .toEqual('/products/123/colorOptions');
                expect(siteMap
                    .product(123)
                    .colorOption(1))
                    .toEqual('/products/123/colorOption/1');
            },
        );
    },
);
