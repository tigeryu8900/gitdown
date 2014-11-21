var expect = require('chai').expect,
    requireNew = require('require-new');

describe('Parser.helpers.contents', function () {
    var helper;
    beforeEach(function () {
        helper = requireNew('../../src/helpers/contents.js');
    });
    it('generates table of contents for a markdown document', function () {
        var contents = helper({}, {markdown: '\n# a\n## b\n##c '});

        expect(contents).to.equal('* [a](#a)\n    * [b](#b)\n    * [c](#c)\n');
    });
    xit('generates table of contents with a maxLevel', function () {
        var contents = helper({maxLevel: 2}, {markdown: '\n# a\n## b\n###c'});

        expect(contents).to.equal('* [a](#a)\n    * [b](#b)\n');
    })
    describe('.maxLevel()', function () {
        it('removes nodes with level equal to maxLevel', function () {
            var tree,
                treeAfterMaxDepth;

            tree = [{
                level: 1,
                descendants: [
                    {
                        level: 2,
                        descendants: [
                            {
                                level: 3,
                                descendants: []
                            }
                        ]
                    }
                ]
            }];

            treeAfterMaxDepth = [{
                level: 1,
                descendants: [
                    {
                        level: 2,
                        descendants: []
                    }
                ]
            }];

            expect(helper.maxLevel(tree, 2)).to.deep.equal(treeAfterMaxDepth);
        });
    });
});