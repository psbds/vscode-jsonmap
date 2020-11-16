import { executionAsyncResource } from 'async_hooks';
import * as vscode from 'vscode';

class TestHelper {

    public async activateExtesion(): Promise<void> {
        var ext = vscode.extensions.all.find(e => e.id.includes("vscode-jsonmap"));
        console.log(`Activating the Extension ${ext.id} / ${ext.extensionPath} / ${ext.extensionUri}`);
        return await ext.activate();
    }

    public async createTempDocument(content: string): Promise<vscode.TextDocument> {
        var doc = await vscode.workspace.openTextDocument(vscode.Uri.parse(`untitled:${__dirname}/${new Date().toString()}`));
        await vscode.window.showTextDocument(doc, vscode.ViewColumn.One, false);
        await vscode.window.activeTextEditor.edit(file => {
            file.insert(new vscode.Position(0, 0), content);
        });
        return doc;
    }

    public getMockValidDocument(): string {
        var doc = [
            {
                "_id": "5fb0abd9dcff9dcbdbba79bf",
                "index": 0,
                "guid": "3f95c25b-e9c8-4685-81d4-3757b1111951",
                "isActive": true,
                "balance": "$1,307.47",
                "picture": "http://placehold.it/32x32",
                "age": 26,
                "eyeColor": "brown",
                "name": "Kristine Gilbert",
                "gender": "female",
                "company": "PHORMULA",
                "email": "kristinegilbert@phormula.com",
                "phone": "+1 (841) 485-2004",
                "address": "631 Opal Court, Belfair, Guam, 8725",
                "about": "Labore pariatur minim pariatur sint amet. Labore ullamco et aute Lorem magna est Lorem dolore veniam nisi esse dolor reprehenderit. Dolore dolor ipsum do pariatur. Enim ex proident aliquip nostrud veniam non dolor duis nisi velit officia id.\r\n",
                "registered": "2016-07-23T08:02:46 +03:00",
                "latitude": 84.644956,
                "longitude": -102.309514,
                "tags": [
                    "quis",
                    "pariatur",
                    "incididunt",
                    "nostrud",
                    "tempor",
                    "duis",
                    "esse"
                ],
                "friends": [
                    {
                        "id": 0,
                        "name": "Middleton Vaughan"
                    },
                    {
                        "id": 1,
                        "name": "Huber Watson"
                    },
                    {
                        "id": 2,
                        "name": "Rita Whitley"
                    }
                ],
                "greeting": "Hello, Kristine Gilbert! You have 2 unread messages.",
                "favoriteFruit": "banana"
            },
            {
                "_id": "5fb0abd9b180afcf35cd3557",
                "index": 1,
                "guid": "74982a02-152c-475c-a51b-d671da6efe58",
                "isActive": false,
                "balance": "$2,013.30",
                "picture": "http://placehold.it/32x32",
                "age": 39,
                "eyeColor": "brown",
                "name": "Huff Morrow",
                "gender": "male",
                "company": "SEALOUD",
                "email": "huffmorrow@sealoud.com",
                "phone": "+1 (968) 519-3955",
                "address": "401 Vermont Court, Lewis, Alaska, 8099",
                "about": "Ad qui officia sunt reprehenderit excepteur non sunt eu aliqua laborum enim occaecat aliquip aliquip. Ipsum labore non aute culpa id voluptate enim quis adipisicing irure irure. Enim cillum esse reprehenderit officia quis enim in ad dolor.\r\n",
                "registered": "2015-02-18T09:04:56 +02:00",
                "latitude": 15.109495,
                "longitude": -21.879153,
                "tags": [
                    "sit",
                    "velit",
                    "aute",
                    "in",
                    "reprehenderit",
                    "in",
                    "consequat"
                ],
                "friends": [
                    {
                        "id": 0,
                        "name": "Jan Robles"
                    },
                    {
                        "id": 1,
                        "name": "Mcintosh Mcneil"
                    },
                    {
                        "id": 2,
                        "name": "Rose Myers"
                    }
                ],
                "greeting": "Hello, Huff Morrow! You have 3 unread messages.",
                "favoriteFruit": "apple"
            },
            {
                "_id": "5fb0abd93dcd243cb700dc0a",
                "index": 2,
                "guid": "e523bc3f-e66a-4bb6-9702-83ae541f8428",
                "isActive": true,
                "balance": "$1,082.73",
                "picture": "http://placehold.it/32x32",
                "age": 29,
                "eyeColor": "green",
                "name": "Bridgett Fleming",
                "gender": "female",
                "company": "MARVANE",
                "email": "bridgettfleming@marvane.com",
                "phone": "+1 (857) 466-2971",
                "address": "976 Union Street, Greenfields, New Mexico, 3966",
                "about": "Enim excepteur incididunt veniam deserunt veniam in cillum dolore est id adipisicing enim laboris. Velit est consectetur sint duis esse Lorem culpa deserunt veniam qui ea consequat tempor. Anim excepteur minim deserunt sit exercitation ea enim incididunt Lorem sunt mollit do aliquip. Officia quis ut excepteur ut nisi amet laboris duis id cillum aute duis. Fugiat minim qui nulla amet laboris consectetur id. Laborum magna ut ex ullamco cillum proident anim. Anim cillum consectetur amet minim Lorem eiusmod magna ea.\r\n",
                "registered": "2015-05-02T05:15:24 +03:00",
                "latitude": 64.325652,
                "longitude": -92.500213,
                "tags": [
                    "officia",
                    "eu",
                    "anim",
                    "cupidatat",
                    "exercitation",
                    "ea",
                    "anim"
                ],
                "friends": [
                    {
                        "id": 0,
                        "name": "Cora Sherman"
                    },
                    {
                        "id": 1,
                        "name": "Paige Good"
                    },
                    {
                        "id": 2,
                        "name": "Neal Mason"
                    }
                ],
                "greeting": "Hello, Bridgett Fleming! You have 7 unread messages.",
                "favoriteFruit": "apple"
            },
            {
                "_id": "5fb0abd91e1d06871be26dbf",
                "index": 3,
                "guid": "7230ae42-97cb-4da9-8f6a-3900aef65af9",
                "isActive": false,
                "balance": "$1,829.28",
                "picture": "http://placehold.it/32x32",
                "age": 30,
                "eyeColor": "brown",
                "name": "Mai Vance",
                "gender": "female",
                "company": "FROSNEX",
                "email": "maivance@frosnex.com",
                "phone": "+1 (941) 482-2114",
                "address": "980 Suydam Street, Ripley, Illinois, 5956",
                "about": "Dolore aute culpa commodo culpa et ex velit. Eiusmod aliquip est irure veniam fugiat deserunt sint ex. Duis sint enim eiusmod est in dolore aliqua nisi sint velit dolore. Commodo est in ut ipsum ipsum ad laborum veniam ut. Enim est minim elit incididunt aliqua dolore duis consequat consequat ea laborum nulla incididunt. Ad culpa eiusmod mollit Lorem culpa nostrud ipsum velit. Nostrud commodo fugiat labore quis aute consequat voluptate cupidatat excepteur voluptate velit sint consectetur.\r\n",
                "registered": "2014-07-05T01:15:33 +03:00",
                "latitude": 83.220637,
                "longitude": 43.1205,
                "tags": [
                    "ut",
                    "dolore",
                    "et",
                    "ipsum",
                    "id",
                    "aliquip",
                    "pariatur"
                ],
                "friends": [
                    {
                        "id": 0,
                        "name": "Frank Wells"
                    },
                    {
                        "id": 1,
                        "name": "Ingrid Hahn"
                    },
                    {
                        "id": 2,
                        "name": "Mckinney Key"
                    }
                ],
                "greeting": "Hello, Mai Vance! You have 2 unread messages.",
                "favoriteFruit": "strawberry"
            },
            {
                "_id": "5fb0abd9c3c23348b4581c2d",
                "index": 4,
                "guid": "f33c937e-9603-40c6-ac31-ec7c2d47927d",
                "isActive": true,
                "balance": "$1,706.85",
                "picture": "http://placehold.it/32x32",
                "age": 24,
                "eyeColor": "brown",
                "name": "Sophia Rutledge",
                "gender": "female",
                "company": "FLUM",
                "email": "sophiarutledge@flum.com",
                "phone": "+1 (841) 540-3208",
                "address": "199 Vine Street, Moquino, South Carolina, 5751",
                "about": "Dolor enim ut ad dolor eu incididunt mollit. Adipisicing quis et sint id ipsum laborum esse. Occaecat incididunt consectetur voluptate ut ex consequat. Deserunt nisi laboris Lorem dolor eu. Sunt qui esse sit veniam voluptate ad eu. Proident dolor veniam ea in. Quis ut amet nulla voluptate.\r\n",
                "registered": "2015-12-02T07:56:23 +02:00",
                "latitude": -24.825328,
                "longitude": 109.359448,
                "tags": [
                    "id",
                    "eu",
                    "ipsum",
                    "deserunt",
                    "non",
                    "consequat",
                    "consequat"
                ],
                "friends": [
                    {
                        "id": 0,
                        "name": "Glass Lloyd"
                    },
                    {
                        "id": 1,
                        "name": "Ginger Mendoza"
                    },
                    {
                        "id": 2,
                        "name": "Meadows Johnston"
                    }
                ],
                "greeting": "Hello, Sophia Rutledge! You have 6 unread messages.",
                "favoriteFruit": "apple"
            },
            {
                "_id": "5fb0abd9b2a05bb7cefb5b8a",
                "index": 5,
                "guid": "1dd1b56f-9e16-4527-b370-8684e4908979",
                "isActive": true,
                "balance": "$3,017.11",
                "picture": "http://placehold.it/32x32",
                "age": 28,
                "eyeColor": "brown",
                "name": "Kirsten Goodwin",
                "gender": "female",
                "company": "HAWKSTER",
                "email": "kirstengoodwin@hawkster.com",
                "phone": "+1 (932) 486-3530",
                "address": "927 Village Court, Eagleville, California, 4520",
                "about": "Magna commodo non ea sint velit minim laboris est occaecat reprehenderit. Consectetur deserunt sunt est consectetur tempor nostrud ea nulla Lorem id. Non nostrud elit fugiat deserunt et dolore excepteur mollit. Laborum culpa velit irure veniam non ex nisi.\r\n",
                "registered": "2016-04-30T03:40:30 +03:00",
                "latitude": -21.450407,
                "longitude": -173.500807,
                "tags": [
                    "sit",
                    "minim",
                    "ipsum",
                    "consectetur",
                    "sit",
                    "incididunt",
                    "deserunt"
                ],
                "friends": [
                    {
                        "id": 0,
                        "name": "Jensen Velazquez"
                    },
                    {
                        "id": 1,
                        "name": "Ramirez Gates"
                    },
                    {
                        "id": 2,
                        "name": "Barlow Garrett"
                    }
                ],
                "greeting": "Hello, Kirsten Goodwin! You have 6 unread messages.",
                "favoriteFruit": "strawberry"
            },
            {
                "_id": "5fb0abd948cc1decf71e74de",
                "index": 6,
                "guid": "f557aa31-d252-42b2-9ae9-edc5d50b6e51",
                "isActive": false,
                "balance": "$1,867.50",
                "picture": "http://placehold.it/32x32",
                "age": 25,
                "eyeColor": "green",
                "name": "Henry Waters",
                "gender": "male",
                "company": "ADORNICA",
                "email": "henrywaters@adornica.com",
                "phone": "+1 (939) 411-2014",
                "address": "736 Blake Court, Retsof, Hawaii, 8441",
                "about": "Consectetur eu mollit ullamco in est excepteur in dolore. Est amet commodo nisi adipisicing id est laborum aliqua mollit minim officia voluptate veniam irure. Eu laborum in laboris laboris quis nulla proident incididunt ut cillum.\r\n",
                "registered": "2015-10-04T06:00:37 +03:00",
                "latitude": -65.170138,
                "longitude": -80.781307,
                "tags": [
                    "occaecat",
                    "deserunt",
                    "id",
                    "eiusmod",
                    "est",
                    "nisi",
                    "commodo"
                ],
                "friends": [
                    {
                        "id": 0,
                        "name": "Thelma Raymond"
                    },
                    {
                        "id": 1,
                        "name": "Montoya Mckenzie"
                    },
                    {
                        "id": 2,
                        "name": "Elvira Pruitt"
                    }
                ],
                "greeting": "Hello, Henry Waters! You have 10 unread messages.",
                "favoriteFruit": "strawberry"
            }
        ];
        return JSON.stringify(doc);
    }

    public getMockInvalidDocument(): string {
        return "{error";
    }
}
export default new TestHelper();