<?php
/**
 * (C) MoPad
 */
namespace MoPad\AdminBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * The GameRepository offer all useful repository methods. 
 *
 * @author Janina Trost <janina.trost@student.htw-berlin.de>
 * @package MoPad\AdminBundle\Entity
 */
class GameRepository extends EntityRepository
{
	/**
	 * save a game entity in database
	 * 
	 * @param game
	 */
	public function createGame($game)
	{
	    $em = $this->getEntityManager();
	    $em->persist($product);
	    $em->flush();
	}
	
	/**
	 * update a game entity in database
	 * 
	 * @param game
	 */
	public function updateAction($gameNew)
	{
	    $em = $this->getEntityManager();
	    $gameOld = $this->findOneById($gameNew->getId());
	
	    if (!$gameOld) {
	        throw $this->createNotFoundException('No game found for id '.$gameNew->getId());
	    }
	
	    $gameOld->$gameNew;
	    $em->flush();
	}

	/**
	 * remove a game entity from database
	 * 
	 * @param game id
	 */
	public function removeAction($id)
	{
	    $em = $this->getEntityManager();
	    $gameOld = $this->findOneById($id);
	
	    if (!$gameOld) {
	        throw $this->createNotFoundException('No game found for id '.$id);
	    }
	
	    $em->remove($gameOld);
		$em->flush();
	}
	
	/**
	 * find all games in ordered by name
	 * 
	 * @return game list
	 */
	public function findAllOrderedByName()
    {
        $games = $this->getEntityManager()
            ->createQuery('SELECT p FROM MoPadAdminBundle:Game p ORDER BY p.name ASC')
            ->getResult();
			
		if (!$games) {
	        throw $this->createNotFoundException('No games found  ');
	    }
		
		return $games;
    }
	
	/**
	 * find the one games with the given id
	 * 
	 * @param game id
	 * @return game
	 */
	public function findOneById($id)
    {
    	$game = $this->getDoctrine()->getRepository('MoPadAdminBundle:Game')->findOneById($id);
    	if (!$game) {
	        throw $this->createNotFoundException('No game found for id '.$id);
	    }
    	return $game;
	}
	
	/**
	 * find the one games with the given name
	 * 
	 * @param game name
	 * @return game
	 */
	public function findOneByName($name)
    {
    	$game = $this->getDoctrine()->getRepository('MoPadAdminBundle:Game')->findOneByName($name);
    	if (!$game) {
	        throw $this->createNotFoundException('No game found for name '.$name);
	    }
    	return $game;
	}
	
	/**
	 * find all games
	 * 
	 * return game list
	 */
	/*public function findAll()
    {
    	$games = $this->getDoctrine()->getRepository('MoPadAdminBundle:Game')->findAll();
		return $games;
	}*/
}