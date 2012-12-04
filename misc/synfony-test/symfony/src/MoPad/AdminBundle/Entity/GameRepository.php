<?php

namespace MoPad\AdminBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * GameRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class GameRepository extends EntityRepository
{
	public function createGame($game)
	{
	    $em = $this->getEntityManager();
	    $em->persist($product);
	    $em->flush();
	}
	
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
	
	public function findOneById($id)
    {
    	$game = $this->getDoctrine()->getRepository('MoPadAdminBundle:Game')->findOneById($id);
    	if (!$game) {
	        throw $this->createNotFoundException('No game found for id '.$id);
	    }
    	return $game;
	}
	
	public function findOneByName($name)
    {
    	$game = $this->getDoctrine()->getRepository('MoPadAdminBundle:Game')->findOneByName($name);
    	if (!$game) {
	        throw $this->createNotFoundException('No game found for name '.$name);
	    }
    	return $game;
	}
	
	/*public function findAll($name)
    {
    	$games = $this->getDoctrine()->getRepository('MoPadAdminBundle:Game')->findAll();
		return $games;
	}*/
}