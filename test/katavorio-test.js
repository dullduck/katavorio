
QUnit.reorder = false;

var divs  =[],
	_add = function(id, parent) {
		var d = document.createElement("div");
		d.setAttribute("id", id);
		divs.push(d);
        (parent || document.body).appendChild(d);
		return d;
	},
	_clear = function() {
		for (var i = 0; i < divs.length; i++) {
			divs[i].parentNode.removeChild(divs[i]);
		}
		divs.length = 0;
		k = null;
	},
	k,
	seh = new DefaultKatavorioHelper();

var testSuite = function() {
	
	module("Katavorio", {
		teardown: _clear,
		setup:function() {
            k = new Katavorio({
                getPosition:seh.getPosition,
                setPosition:seh.setPosition,
                getSize:seh.getSize,
                addClass:seh.addClass,
                removeClass:seh.removeClass,
                bind:seh.addEvent,
                unbind:seh.removeEvent,
                fireEvent:function() { 
                    console.log(arguments); 
                },
                intersects:seh.intersects,
				indexOf:seh.indexOf
           });
		}
	});
    
// --------------------------- SCOPE -----------------------------------------------
    
    test("change scope of draggable, via katavorio instance, on element", function() {
        var d1 = _add("d1");
        var d = k.draggable(d1, {
            scope:"scope1 scope2"
        });
        equal(d[0].scopes.length, 2, "2 scopes");
		equal(d[0].scopes[0], "scope1");
		equal(d[0].scopes[1], "scope2");
		
		equal(k.getDragsForScope("scope1").length, 1, "1 drag for scope1");
		equal(k.getDragsForScope("scope2").length, 1, "1 drag for scope2");
		
		k.setScope(d1, "scope3 scope4");
		equal(d[0].scopes.length, 2, "2 scopes");
		equal(d[0].scopes[0], "scope3");
		equal(d[0].scopes[1], "scope4");
		equal(k.getDragsForScope("scope1").length, 0, "0 drags for scope1");
		equal(k.getDragsForScope("scope2").length, 0, "0 drags for scope2");
		equal(k.getDragsForScope("scope3").length, 1, "1 drag for scope3");
		equal(k.getDragsForScope("scope4").length, 1, "1 drag for scope4");
		
		k.setDragScope(d1, "scope5");
		equal(k.getDragsForScope("scope3").length, 0, "0 drags for scope3");
		equal(k.getDragsForScope("scope4").length, 0, "0 drags for scope4");
		equal(k.getDragsForScope("scope5").length, 1, "1 drag for scope5");

        k.addDragScope(d1, "scope6");
        equal(k.getDragsForScope("scope5").length, 1, "1 drag for scope5");
        equal(k.getDragsForScope("scope6").length, 1, "1 drag for scope6");

        // test multiples, and ensure scope8 is not added twice.
        k.addDragScope(d1, "scope7 scope8 scope8");
        equal(k.getDragsForScope("scope7").length, 1, "1 drag for scope7");
        equal(k.getDragsForScope("scope8").length, 1, "1 drag for scope8");

        k.removeDragScope(d1, "scope7");
        equal(k.getDragsForScope("scope7").length, 0, "0 drags for scope7");

        k.removeDragScope(d1, "scope6 scope8");
        equal(k.getDragsForScope("scope6").length, 0, "0 drags for scope6");
        equal(k.getDragsForScope("scope8").length, 0, "0 drags for scope8");

        k.toggleDragScope(d1, "scope8");
        equal(k.getDragsForScope("scope8").length, 1, "1 drag for scope8");

        k.toggleDragScope(d1, "scope8 scope9");
        equal(k.getDragsForScope("scope8").length, 0, "0 drags for scope8");
        equal(k.getDragsForScope("scope9").length, 1, "1 drag for scope9");
    });
	
	test("change scope of droppable, via katavorio instance, on element", function() {
        var d1 = _add("d1");
        var d = k.droppable(d1, {
            scope:"scope1 scope2"
        });
        equal(d[0].scopes.length, 2, "2 scopes");
		equal(d[0].scopes[0], "scope1");
		equal(d[0].scopes[1], "scope2");
		
		equal(k.getDropsForScope("scope1").length, 1, "1 dopr for scope1");
		equal(k.getDropsForScope("scope2").length, 1, "1 drop for scope2");
		
		k.setScope(d1, "scope3 scope4");
		equal(d[0].scopes.length, 2, "2 scopes");
		equal(d[0].scopes[0], "scope3");
		equal(d[0].scopes[1], "scope4");
		equal(k.getDropsForScope("scope1").length, 0, "0 drops for scope1");
		equal(k.getDropsForScope("scope2").length, 0, "0 drops for scope2");
		equal(k.getDropsForScope("scope3").length, 1, "1 drop for scope3");
		equal(k.getDropsForScope("scope4").length, 1, "1 drop for scope4");
		
		k.setDropScope(d1, "scope5");
		equal(k.getDropsForScope("scope3").length, 0, "0 drops for scope3");
		equal(k.getDropsForScope("scope4").length, 0, "0 drops for scope4");
		equal(k.getDropsForScope("scope5").length, 1, "1 drop for scope5");

        k.addDropScope(d1, "scope6");
        equal(k.getDropsForScope("scope5").length, 1, "1 Drop for scope5");
        equal(k.getDropsForScope("scope6").length, 1, "1 Drop for scope6");

        // test multiples, and ensure scope8 is not added twice.
        k.addDropScope(d1, "scope7 scope8 scope8");
        equal(k.getDropsForScope("scope7").length, 1, "1 Drop for scope7");
        equal(k.getDropsForScope("scope8").length, 1, "1 Drop for scope8");

        k.removeDropScope(d1, "scope7");
        equal(k.getDropsForScope("scope7").length, 0, "0 Drops for scope7");

        k.removeDropScope(d1, "scope6 scope8");
        equal(k.getDropsForScope("scope6").length, 0, "0 Drops for scope6");
        equal(k.getDropsForScope("scope8").length, 0, "0 Drops for scope8");

        k.toggleDropScope(d1, "scope8");
        equal(k.getDropsForScope("scope8").length, 1, "1 Drop for scope8");

        k.toggleDropScope(d1, "scope8 scope9");
        equal(k.getDropsForScope("scope8").length, 0, "0 Drops for scope8");
        equal(k.getDropsForScope("scope9").length, 1, "1 Drop for scope9");
    });
	
// --------------------------- / SCOPE -----------------------------------------------

// --------------------------- DRAGGABLE/DROPPABLE -----------------------------------------------
	
	test("make draggable via element", function() {
		var d1 = _add("d1");
		k.draggable(d1);
		ok(d1._katavorioDrag != null, "drag initialized");
	});
	
	test("make draggable via element id", function() {
		var d1 = _add("d1");
		k.draggable("d1");
		ok(d1._katavorioDrag != null, "drag initialized");
	});
	
	test("make draggable via element array", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.draggable([d1, d2]);
		ok(d1._katavorioDrag != null, "drag initialized");
		ok(d2._katavorioDrag != null, "drag initialized");
	});
	
	test("make draggable via array of ids", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.draggable(["d1", "d2"]);
		ok(d1._katavorioDrag != null, "drag initialized");
		ok(d2._katavorioDrag != null, "drag initialized");
	});
	
	test("make draggable via Node list", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		d1.className = "foo";
		d2.className = "foo";
		k.draggable(document.querySelectorAll(".foo"));
		ok(d1._katavorioDrag != null, "drag initialized");
		ok(d2._katavorioDrag != null, "drag initialized");
	});
	
	test("make droppable via element", function() {
		var d1 = _add("d1");
		k.droppable(d1);
		ok(d1._katavorioDrop != null, "drop initialized");
	});
	
	test("make droppable via element id", function() {
		var d1 = _add("d1");
		k.droppable("d1");
		ok(d1._katavorioDrop != null, "drop initialized");
	});
	
	test("make droppable via element array", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.droppable([d1, d2]);
		ok(d1._katavorioDrop != null, "drop initialized");
		ok(d2._katavorioDrop != null, "drop initialized");
	});
	
	test("make droppable via array of ids", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.droppable(["d1", "d2"]);
		ok(d1._katavorioDrop != null, "drop initialized");
		ok(d2._katavorioDrop != null, "drop initialized");
	});
	
	test("make droppable via Node list", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		d1.className = "foo";
		d2.className = "foo";
		k.droppable(document.querySelectorAll(".foo"));
		ok(d1._katavorioDrop != null, "drop initialized");
		ok(d2._katavorioDrop != null, "drop initialized");
	});
	
	test("make draggable, non-existent node", function() {
		var f = 0;
		try {
			k.draggable("foo");
		}
		catch (e) {
			f = 1;
		}
		equal(f, 0, "no exception thrown");
	});
	
	test("make draggable, null argument", function() {
		var f = 0;
		try {
			k.draggable(null);
		}
		catch (e) {
			f = 1;
		}
		equal(f, 0, "no exception thrown");
	});
	
	test("make droppable, non-existent node", function() {
		var f = 0;
		try {
			k.droppable("foo");
		}
		catch (e) {
			f = 1;
		}
		equal(f, 0, "no exception thrown");
	});
	
	test("make droppable, null argument", function() {
		var f = 0;
		try {
			k.droppable(null);
		}
		catch (e) {
			f = 1;
		}
		equal(f, 0, "no exception thrown");
	});
	
// --------------------------- / DRAGGABLE/DROPPABLE -----------------------------------------------

// --------------------------- DRAG SELECTION -----------------------------------------------

	test("simple drag selection, by element", function() {
		var d1 = _add("d1");
		k.draggable(d1);
		k.select(d1);
		equal(k.getSelection().length, 1, "one element in selection");
	});
	
	test("simple drag selection, by element id", function() {
		var d1 = _add("d1");
		k.draggable(d1);
		k.select("d1");
		equal(k.getSelection().length, 1, "one element in selection");
	});
	
	test("simple drag selection, by element array", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.draggable(d1);
		k.draggable(d2);
		k.select([d1,d2]);
		equal(k.getSelection().length, 2, "two elements in selection");
	});
	
	test("simple drag selection, by id array", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.draggable(d1);
		k.draggable(d2);
		k.select(["d1","d2"]);
		equal(k.getSelection().length, 2, "two elements in selection");
	});
	
	test("simple drag selection, by Node list", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.draggable(d1);
		k.draggable(d2);
		d1.className = "foo";
		d2.className = "foo";
		k.select(document.querySelectorAll(".foo"));
		equal(k.getSelection().length, 2, "two elements in selection");
	});
	
	//ffsfdsafs
	
	test("simple drag deselection, by element", function() {
		var d1 = _add("d1");
		k.draggable(d1);
		k.select(d1);
		equal(k.getSelection().length, 1, "one element in selection");
		k.deselect(d1);
		equal(k.getSelection().length, 0, "zero elements in selection");
	});
	
	test("simple drag deselection, by element id", function() {
		var d1 = _add("d1");
		k.draggable(d1);
		k.select("d1");
		equal(k.getSelection().length, 1, "one element in selection");
		k.deselect("d1");
		equal(k.getSelection().length, 0, "zero elements in selection");
	});
	
	test("simple drag selection, by element array", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.draggable(d1);
		k.draggable(d2);
		k.select([d1,d2]);
		equal(k.getSelection().length, 2, "two elements in selection");
		k.deselect([d1,d2]);
		equal(k.getSelection().length, 0, "zero elements in selection");
	});
	
	test("simple drag selection, by id array", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.draggable(d1);
		k.draggable(d2);
		k.select(["d1","d2"]);
		equal(k.getSelection().length, 2, "two elements in selection");
		k.deselect(["d1","d2"]);
		equal(k.getSelection().length, 0, "zero elements in selection");
	});
	
	test("simple drag selection, by Node list", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.draggable(d1);
		k.draggable(d2);
		d1.className = "foo";
		d2.className = "foo";
		k.select(document.querySelectorAll(".foo"));
		equal(k.getSelection().length, 2, "two elements in selection");
		k.deselect(document.querySelectorAll(".foo"));
		equal(k.getSelection().length, 0, "zero elements in selection");
	});
	
	test("deselectAll", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.draggable(d1);
		k.draggable(d2);
		d1.className = "foo";
		d2.className = "foo";
		k.select(document.querySelectorAll(".foo"));
		equal(k.getSelection().length, 2, "two elements in selection");
		k.deselectAll();
		equal(k.getSelection().length, 0, "zero elements in selection");
	});

    // -- filters ---------------------------------

    test("filter set via params", function() {
        var d = _add("d1");
        k.draggable(d, {
            filter:".foo"
        });

        ok(d._katavorioDrag.getFilters()[".foo"] != null, "filter set and retrieved");
        ok(d._katavorioDrag.getFilters()[".foo"][1] == true, "filter exclude set to true");
    });

    test("filter set via setter", function() {
        var d = _add("d1");
        k.draggable(d);
        d._katavorioDrag.setFilter(".foo");
        ok(d._katavorioDrag.getFilters()[".foo"] != null, "filter set and retrieved");
        ok(d._katavorioDrag.getFilters()[".foo"][1] == true, "filter exclude set to true");
    });

    test("filter set via setter, set filterExclude to false", function() {
        var d = _add("d1");
        k.draggable(d);
        d._katavorioDrag.setFilter(".foo", false);
        ok(".foo", d._katavorioDrag.getFilters()[".foo"] != null, "filter set and retrieved");
        ok(d._katavorioDrag.getFilters()[".foo"][1] == false, "filter exclude set to false");
    });

    test("filter set via handle param", function() {
        var d = _add("d1");
        k.draggable(d, {
            handle:".foo"
        });

        ok(".foo", d._katavorioDrag.getFilters()[".foo"] != null, "filter set from handle param");
        ok(d._katavorioDrag.getFilters()[".foo"][1] == false, "filter exclude set to false, from handle param existence");
    });
		
	test("filter function set via params", function () {
	    var d = _add("d1");
		function _foo (ev, el) { return ev.target.classList.contains("foo"); }
        k.draggable(d, {
            filter:_foo
        });

        var filt = d._katavorioDrag.getFilters()[_foo._katavorioId];
        ok( filt != null, "filter set and retrieved");
        ok(filt[1] == true, "filter exclude set to true");
	});
	
	    test("filter function set via setter", function() {
        var d = _add("d1");
		function _foo (ev, el) { return ev.target.classList.contains("foo"); }
        k.draggable(d);
        d._katavorioDrag.setFilter(_foo);
            var filt = d._katavorioDrag.getFilters()[_foo._katavorioId];
        ok(filt != null, "filter set and retrieved");
        ok(filt[1] == true, "filter exclude set to true");
    });

    test("filter function set via setter, set filterExclude to false", function() {
        var d = _add("d1");
		function _foo (ev, el) { return ev.target.classList.contains("foo"); }
        k.draggable(d);
        d._katavorioDrag.setFilter(_foo, false);
        var filt = d._katavorioDrag.getFilters()[_foo._katavorioId];
        ok(filt != null, "filter set and retrieved");
        ok(filt[1] == false, "filter exclude set to false");
    });

    // mouse triggers
    test("filter mouse event, filter provided in draggable call.", function() {
        var d = _add("d1"),
            foo = _add("foo", d),
            m = new Mottle(),
            started = false;

        k.draggable(d, {
            filter:"#foo",
            start:function() {
                started = true;
            }
        });

        m.trigger(foo, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == false, "drag not started");
        started = false;
        m.trigger(d, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == true, "drag started");
    });

    test("filter mouse event, filter exclude, filter provided in draggable call.", function() {
        var d = _add("d1"),
            foo = _add("foo", d),
            m = new Mottle(),
            started = false;

        k.draggable(d, {
            filter:"#foo",
            filterExclude:false,
            start:function() {
                started = true;
            }
        });

        m.trigger(foo, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == true, "drag started");
        started = false;
        m.trigger(d, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == false, "drag not started");
    });

    test("filter mouse event, filter set programmatically.", function() {
        var d = _add("d1"),
            foo = _add("foo", d),
            m = new Mottle(),
            started = false;

        k.draggable(d, {
            start:function() {
                started = true;
            }
        });

        d._katavorioDrag.setFilter("#foo");

        m.trigger(foo, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == false, "drag not started");
        started = false;
        m.trigger(d, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == true, "drag started");
    });

    test("filter mouse event, filterExclude, filter set programmatically.", function() {
        var d = _add("d1"),
            foo = _add("foo", d),
            m = new Mottle(),
            started = false;

        k.draggable(d, {
            start:function() {
                started = true;
            }
        });

        d._katavorioDrag.setFilter("#foo", false);

        m.trigger(foo, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == true, "drag started on element that is the filter");
        started = false;
        m.trigger(d, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == false, "drag not started on filtered elements");
    });

    test("filter mouse event, multiple filters set programmatically.", function() {
        var d = _add("d1"),
            foo = _add("foo", d),
            bar = _add("bar", d),
            m = new Mottle(),
            started = false;

        k.draggable(d, {
            start:function() {
                started = true;
            }
        });

        d._katavorioDrag.setFilter("#foo");

        // foo is filtered
        m.trigger(foo, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == false, "drag not started");
        m.trigger(document, "mouseup");

        // main div not filtered
        started = false;
        m.trigger(d, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == true, "drag started");
        m.trigger(document, "mouseup");

        // bar not filtered
        started = false;
        m.trigger(bar, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == true, "drag started");
        m.trigger(document, "mouseup");

        //now add bar filter - using default exclusion mechanism - and try again
        d._katavorioDrag.addFilter("#bar");
        started = false;
        m.trigger(bar, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == false, "drag not started");
        m.trigger(document, "mouseup");

        // now remove BAR filter, and try again.
        d._katavorioDrag.removeFilter("#bar");
        started = false;
        m.trigger(bar, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == true, "drag started");
        m.trigger(document, "mouseup");

        //now add bar filter but this time say it should be included, not excluded.
        d._katavorioDrag.addFilter("#bar", false);
        started = false;
        m.trigger(bar, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == true, "drag started");
        m.trigger(document, "mouseup");

        // clear all filters and ensure FOO is no longer filtered.
        d._katavorioDrag.clearAllFilters();
        started = false;
        m.trigger(foo, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == true, "drag started");
        m.trigger(document, "mouseup");

    });

    test("drag class added then removed.", function() {
        var d = _add("d1"),
            foo = _add("foo", d),
            bar = _add("bar", d),
            m = new Mottle(),
            started = false;

        k.draggable(d, {
            start: function () {
                started = true;
            }
        });

        m.trigger(foo, "mousedown");
        m.trigger(document, "mousemove");
        ok(d.classList.contains("katavorio-drag"), "drag class set on element");
        m.trigger(document, "mouseup");
        ok(!d.classList.contains("katavorio-drag"), "drag class no longer set on element");
    });

};