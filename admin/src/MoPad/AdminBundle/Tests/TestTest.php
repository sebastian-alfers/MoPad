<?php
/**
 * (C) MoPad
 */
namespace MoPad\AdminBundle\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/**
 * Is only a test case to test the PHPUnit working.
 *
 * @author Janina Trost <janina.trost@student.htw-berlin.de>
 * @package MoPad\AdminBundle\Tests
 */
class TestTest extends WebTestCase
{
	/**
	 * Is only a test case to test the PHPUnit working.
	 */
    public function testPushAndPop()
    {
        $stack = array();
        $this->assertEquals(0, count($stack));
 
        array_push($stack, 'foo');
        $this->assertEquals('foo', $stack[count($stack)-1]);
        $this->assertEquals(1, count($stack));
 
        $this->assertEquals('foo', array_pop($stack));
        $this->assertEquals(0, count($stack));
    }
}
?>