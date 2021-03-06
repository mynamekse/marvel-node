describe('CharacterListService Tests', function () {

    var characterListService;

    beforeEach(function () {
        characterListService = require('../../../../app/services/characters/character-list-service');

        characterListService.characterMapRepository_ = {
            getCharacterMap: function () {
                var characterMap = new Map();
                characterMap.set('spider-man', {
                    id: 1009610,
                    name: 'spider-man',
                    resourceUri: 'http://my.api.com/v1/characters/spider-man',
                    imageUri: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg'
                });

                return characterMap;
            }
        };
    });

    describe('lookupCharacterList', function () {

        it('should be a function', function (done) {
            expect(characterListService.lookupCharacterList).to.be.a('function');
            done();
        });

        it('should return a character list object with an array', function (done) {
            var characterList = characterListService.lookupCharacterList();
            expect(characterList.characters).to.be.a('array');

            done();
        });

        it('should return only spider man in the character list', function (done) {
            var characterList = characterListService.lookupCharacterList();

            expect(characterList.characters.length).to.equal(1);
            expect(characterList.characters[0].name).to.equal('spider-man');

            done();
        });

        it('should rethrow exception from character map respository', function (done) {
            characterListService.characterMapRepository_.getCharacterMap = function () {
                throw new Error('Unhandled Error');
            };

            var lookupCharacterList = function () {
                characterListService.lookupCharacterList();
            };

            expect(lookupCharacterList).to.throw(Error, 'Unhandled Error');

            done();
        });

    });
});
