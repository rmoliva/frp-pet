const chai = require('chai');
const expect = chai.expect;
// const R = require('ramda');
const componentTree = require('./tree');

describe('components/tree', function() {
  const _nodes = {};
  const _tree = componentTree(_nodes);

  it('getRoots should be empty', function() {
    expect(_tree.getRoots()).to.eql([]);
  });

  describe('add one node element', function() {
    const _firstData = {
      id: 'firstData',
      value: 5,
    };
    beforeEach(function() {
      this.firstNode = _tree.addNode(_firstData);
    });

    it('getRoots should return the first element', function() {
      expect(_tree.getRoots()).to.eql([{
        id: 'firstData',
        data: _firstData,
        children: [],
        parent: null,
      }]);
    });

    describe('add second node element', function() {
      const _secondData = {
        id: 'secondData',
        value: 15,
      };
      beforeEach(function() {
        this.secondNode = _tree.addNode(_secondData);
      });

      it('getRoots should return the two elements', function() {
        expect(_tree.getRoots()).to.have.deep.members([{
          id: 'firstData',
          data: _firstData,
          children: [],
          parent: null,
        }, {
          id: 'secondData',
          data: _secondData,
          children: [],
          parent: null,
        }]);
      });

      describe('add third node element', function() {
        const _thirdData = {
          id: 'thirdData',
          value: 27,
        };
        beforeEach(function() {
          this.thirdNode = _tree.addNode(_thirdData);
        });

        it('getRoots should return the three elements', function() {
          expect(_tree.getRoots()).to.eql([{
            id: 'firstData',
            data: _firstData,
            children: [],
            parent: null,
          }, {
            id: 'secondData',
            data: _secondData,
            children: [],
            parent: null,
          }, {
            id: 'thirdData',
            data: _thirdData,
            children: [],
            parent: null,
          }]);
        });

        describe('findNodeById', function() {
          it('should return first node', function() {
            let node = _tree.findNodeById(this.firstNode.id);
            expect(node.id).to.eql(this.firstNode.id);
          });
          it('should return second node', function() {
            let node = _tree.findNodeById(this.secondNode.id);
            expect(node.id).to.eql(this.secondNode.id);
          });
          it('should return third node', function() {
            let node = _tree.findNodeById(this.thirdNode.id);
            expect(node.id).to.eql(this.thirdNode.id);
          });
        });

        describe('make third element children of the first', function() {
          beforeEach(function() {
            _tree.setParent(this.firstNode.id, this.thirdNode.id);
          });

          it('getRoots should return two elements', function() {
            expect(_tree.getRoots()).to.have.deep.members([{
              id: 'firstData',
              data: _firstData,
              children: ['thirdData'],
              parent: null,
            }, {
              id: 'secondData',
              data: _secondData,
              children: [],
              parent: null,
            }]);
          });

          it('getChildren of second node should be empty', function() {
            let node = _tree.findNodeById(this.secondNode.id);
            expect(node.children).to.eql([]);
          });

          it('getChildren of first node should return third node', function() {
            let node = _tree.findNodeById(this.firstNode.id);
            expect(node).to.eql({
              id: 'firstData',
              data: _firstData,
              children: ['thirdData'],
              parent: null,
            });
          });

          it('parent of third node should return first node', function() {
            let node = _tree.findNodeById(this.thirdNode.id);
            expect(node).to.eql({
              id: 'thirdData',
              data: _thirdData,
              children: [],
              parent: 'firstData',
            });
          });
        });
      });
    });
  });
  afterEach(function() {
    _tree.clean();
  });
});
